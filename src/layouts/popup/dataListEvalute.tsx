import { images } from 'assets';

export interface ITripData {
    id: string;
    backgroundImage: string;
    place: string;
}

export const tripData: ITripData[] = [
    {
        id: '1',
        backgroundImage: images.Trip1,
        place: 'Thị trấn Ait Benhaddou ở Maroc',
    },
    {
        id: '2',
        backgroundImage: images.Trip2,
        place: 'Hồ Como, Ý',
    },
    {
        id: '3',
        backgroundImage: images.Trip3,
        place: 'Đảo Crete, Hy Lạp',
    },
    {
        id: '4',
        backgroundImage: images.Trip4,
        place: 'Machu Picchu, Peru',
    },
    {
        id: '5',
        backgroundImage: images.Trip5,
        place: 'Hội An, Việt Nam',
    },
    {
        id: '6',
        backgroundImage: images.Trip6,
        place: 'Trại sang trọng dưới những vì sao ở Merzouga',
    },
    {
        id: '7',
        backgroundImage: images.Trip7,
        place: 'Đấng Cứu Rỗi Trên Dòng Máu Nước Nga',
    },
    {
        id: '8',
        backgroundImage: images.Trip8,
        place: 'Vịnh Hạ Long, Việt Nam',
    },
    {
        id: '9',
        backgroundImage: images.Trip9,
        place: 'Angkor Wat, Campuchia',
    },
    {
        id: '10',
        backgroundImage: images.Trip10,
        place: 'Bali, Indonesia',
    },
    {
        id: '11',
        backgroundImage: images.Trip11,
        place: 'Petra, Jordan',
    },
    {
        id: '12',
        backgroundImage: images.Trip12,
        place: 'Taj Mahal, Ấn Độ',
    },
    {
        id: '13',
        backgroundImage: images.Trip13,
        place: 'Cappadocia, Thổ Nhĩ Kỳ',
    },
    {
        id: '14',
        backgroundImage: images.Trip14,
        place: 'Monaco',
    },
    {
        id: '15',
        backgroundImage: images.Trip15,
        place: 'Cinque Terre, Ý',
    },
    {
        id: '16',
        backgroundImage: images.Trip16,
        place: 'Lâu đài Kumamoto',
    },
    {
        id: '17',
        backgroundImage: images.Trip17,
        place: 'Vương Cung Thánh Đường Saint Mark Ý',
    },
    {
        id: '18',
        backgroundImage: images.Trip18,
        place: 'RICKSHOW Trên Đường Phô TAKAYAMA',
    },
    {
        id: '19',
        backgroundImage: images.Trip19,
        place: 'Thủ đô Edinburgh, Scotland',
    },
    {
        id: '20',
        backgroundImage: images.Trip20,
        place: 'Nhà thờ thánh Isaac Nga',
    },
    {
        id: '21',
        backgroundImage: images.Trip21,
        place: 'Nhà thờ Hồi giáo Hassan ll',
    },
    {
        id: '22',
        backgroundImage: images.Trip22,
        place: 'Budapest – Hungary',
    },
    {
        id: '23',
        backgroundImage: images.Trip23,
        place: 'Kinkakuji Temple In Kyoto',
    },
    {
        id: '24',
        backgroundImage: images.Trip24,
        place: 'Nhà thờ chính tòa Milano Ý',
    },
    {
        id: '25',
        backgroundImage: images.Trip25,
        place: 'Pantheon Ý',
    },
    {
        id: '26',
        backgroundImage: images.Trip26,
        place: 'Thành phố cổ Trier – Đức',
    },
];
