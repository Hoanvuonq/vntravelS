import { Tooltip } from '@material-tailwind/react';
import { getAllInterventions, editIntervention, deleteIntervention } from 'api/admin';
import { IUserInfo } from 'api/type';
import { images } from 'assets';
import { useEffect, useMemo, useState } from 'react';
import ToastProvider from 'hooks/useToastProvider';
import { useUserInfo } from 'hooks/UserContext';

interface PopupProps {
    user: IUserInfo;
}

interface Intervention {
    _id: string;
    userId: string;
    journeyIndex: number;
    additionalPoints: number;
}

const LuckyHistoryUser: React.FC<PopupProps> = ({ user }) => {
    const { fetchAdminUserInfo } = useUserInfo();
    const [interventions, setInterventions] = useState<Intervention[]>([]);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState<string | null>(null);
    const [editValues, setEditValues] = useState<{ journeyIndex: number; additionalPoints: number }>({ journeyIndex: 0, additionalPoints: 0 });

    useEffect(() => {
        const fetchInterventions = async () => {
            try {
                const response = await getAllInterventions(user._id);
                if (response.status) {
                    setInterventions(response.data);
                }
            } catch (error) {
                console.error('Lỗi khi lấy nhật ký đơn may mắn:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchInterventions();
    }, [user._id]);

    const handleEditClick = (intervention: Intervention) => {
        setEditMode(intervention._id);
        setEditValues({ journeyIndex: intervention.journeyIndex, additionalPoints: intervention.additionalPoints });
    };

    const handleSendClick = async (interventionId: string) => {
        try {
            await editIntervention(interventionId, editValues.journeyIndex, editValues.additionalPoints);
            setInterventions((prev) =>
                prev.map((intervention) => (intervention._id === interventionId ? { ...intervention, journeyIndex: editValues.journeyIndex, additionalPoints: editValues.additionalPoints } : intervention)),
            );
            setEditMode(null);
            ToastProvider('success', 'Gửi đơn may mắn thành công !');
        } catch (error) {
            console.error('Error when editing lucky order:', error);
            ToastProvider('error', 'Gửi đơn may mắn thất bại !');
        }
    };

    const handleDeleteClick = async (interventionId: string) => {
        try {
            const result = await deleteIntervention(interventionId);
            console.log('Intervention deleted successfully:', result);
            setInterventions((prev) => prev.filter((intervention) => intervention._id !== interventionId));
            ToastProvider('success', 'Xóa đơn may mắn thành công !');
        } catch (error) {
            console.error('Failed to delete intervention:', error);
            ToastProvider('error', 'Xóa đơn may mắn thất bại !');
        }
    };

    const HistoryPaymentMemo = useMemo(() => {
        return interventions.map((intervention) => (
            <div key={intervention._id} className={`xl:rounded-[1vw] rounded-[3vw] p-[1vw] flex items-center justify-between shadow-custom-3 history-journey`}>
                <div className="flex items-center justify-between w-full xl:gap-[1vw] gap-[6vw]">
                    <div className="flex items-center xl:gap-[1vw] gap-[3vw]">
                        <img src={images.Star} alt="Star" className="xl:w-[2.5vw] w-[10vw] hover-items" />
                        <div className="flex flex-col gap-[0.2vw]">
                            {editMode === intervention._id ? (
                                <>
                                    <p className="text-infoBill text-gray-700">
                                        <span className="font-bold">ID :</span> {intervention._id.slice(-6)}
                                    </p>
                                    <p className="text-infoBill text-gray-700">
                                        <span className="font-bold">Hành Trình Số :</span>{' '}
                                        <input
                                            type="number"
                                            value={editValues.journeyIndex}
                                            onChange={(e) => setEditValues({ ...editValues, journeyIndex: Number(e.target.value) })}
                                            className="text-infoBill text-gray-700"
                                        />
                                    </p>
                                    <p className="text-infoBill text-gray-700">
                                        <span className="font-bold">Số Tiền Cần Bù :</span>
                                        <input
                                            type="number"
                                            value={editValues.additionalPoints}
                                            onChange={(e) => setEditValues({ ...editValues, additionalPoints: Number(e.target.value) })}
                                            className="text-infoBill text-gray-700"
                                        />
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p className="text-infoBill text-gray-700">
                                        <span className="font-bold">ID :</span> {intervention._id.slice(-6)}
                                    </p>
                                    <p className="text-infoBill text-gray-700">
                                        <span className="font-bold">Hành Trình Số :</span> {intervention.journeyIndex}
                                    </p>
                                    <p className="text-infoBill text-gray-700">
                                        <span className="font-bold">Số Tiền Cần Bù :</span> {intervention.additionalPoints}
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center xl:gap-[1vw] gap-[3vw]">
                        {editMode === intervention._id ? (
                            <Tooltip content="Gửi Đơn May Mắn">
                                <img src={images.Send} alt="Send" className="hover-items cursor-pointer xl:w-[1.5vw] w-[8vw]" onClick={() => handleSendClick(intervention._id)} />
                            </Tooltip>
                        ) : (
                            <Tooltip content="Chỉnh Sửa Đơn May Mắn">
                                <img src={images.Edit} alt="Edit" className="hover-items cursor-pointer xl:w-[1.5vw] w-[8vw]" onClick={() => handleEditClick(intervention)} />
                            </Tooltip>
                        )}
                        <Tooltip content="Xóa Đơn May Mắn">
                            <img src={images.deleteIntervention} alt="Delete" className="hover-items cursor-pointer xl:w-[1.5vw] w-[8vw]" onClick={() => handleDeleteClick(intervention._id)} />
                        </Tooltip>
                    </div>
                </div>
            </div>
        ));
    }, [interventions, editMode, editValues]);

    const hasData = interventions.length > 0;

    return (
        <div className="flex flex-col gap-[1vw] p-[0.2vw]">
            {loading ? (
                <div className="w-full all-center ">
                    <div className="loader-ellipsis mt-[1vw]">
                        <div className="!bg-black"></div>
                        <div className="!bg-black"></div>
                        <div className="!bg-black"></div>
                        <div className="!bg-black"></div>
                    </div>
                </div>
            ) : hasData ? (
                HistoryPaymentMemo
            ) : (
                <div className="w-full all-center xl:h-auto h-[60vw] flex-col xl:gap-[1vw] gap-[3vw] notes">
                    <img src={images.logoTravelS} alt="No Data" className="xl:w-[10vw] w-[50vw] object-cover" />
                    <p className="text-titleNote">User này chưa có nhật ký đơn may mắn !</p>
                </div>
            )}
        </div>
    );
};

export default LuckyHistoryUser;
