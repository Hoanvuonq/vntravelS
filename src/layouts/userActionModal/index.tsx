import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from '@material-tailwind/react';
import { IUserInfo } from 'api/type';

interface UserActionModalProps {
    user: IUserInfo;
    onClose: () => void;
    title: string;
    tabHeaders: string[];
    renderContent: () => React.ReactNode;
}

const UserActionModal: React.FC<UserActionModalProps> = ({ user, onClose, title, tabHeaders, renderContent }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <Card className="w-full max-w-[48rem]" {...({} as any)}>
                <CardHeader className="flex items-center justify-between" {...({} as any)}>
                    <Typography variant="h5" {...({} as any)}>
                        {title}
                    </Typography>
                    <Button color="gray" onClick={onClose} {...({} as any)}>
                        Close
                    </Button>
                </CardHeader>
                <CardBody {...({} as any)}>
                    <div className="mb-4">
                        {tabHeaders.map((header, index) => (
                            <Button key={index} className="mr-2" {...({} as any)}>
                                {header}
                            </Button>
                        ))}
                    </div>
                    {renderContent()}
                </CardBody>
                <CardFooter className="flex justify-end" {...({} as any)}>
                    <Button onClick={onClose} {...({} as any)}>
                        Save Changes
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default UserActionModal;
