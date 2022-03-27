import { IPoint, IRequest, IStore } from '.';

const companies = [
    'Автомобильчик',
    'ТанкоФФ 4х4',
    'АвтоАльянс',
    'Форсаж',
    'Авто Вектор, специализированный установочный центр',
    'Автолюбитель',
    'АвтоГрад',
    'АвтоВАЗ',
    'KuzParts.ru',
    'Рено-Пежо-Лада Ларгус',
    'Авто Газ',
    'Автомагазин',
    'Газель+Сервис',
    'АВТОСТЭЛС',
    'FIT SERVICE',
    'Авто-Планета',
    'Car Parts 42',
    'Engicar',
];

const fakeStore = (requestCount: number, rectBounds: Array<{ lat: number; lng: number }>): IStore => {
    const points = companies.map((item, index) => ({
        key: `${index + 1}`,
        name: item,
        latLng: randomPoint(rectBounds),
    })) as Array<IPoint>;

    const requests = Array(Math.min(requestCount, companies.length))
        .fill(null)
        .map((_, index) => {
            const usedPoints: Array<IPoint> = [];
            const randomDeliveryPoint = () => {
                const s1 = points.filter(item => !usedPoints.includes(item));
                const s2 = s1[Math.floor(Math.random() * s1.length)];
                usedPoints.push(s2);
                return s2;
            };
            return {
                key: `${index + 1}`,
                name: `Заказ № ${index + 1}`,
                start: randomDeliveryPoint(),
                end: randomDeliveryPoint(),
                isRouteVisible: false,
            };
        }) as Array<IRequest>;
    return { ...{ requests }, ...{ points } };
};

const randomPoint = (rectBounds: Array<{ lat: number; lng: number }>) => {
    const lat = Math.abs(Math.random() * (rectBounds[0].lat - rectBounds[1].lat) + rectBounds[1].lat);
    const lng = Math.abs(Math.random() * (rectBounds[0].lng - rectBounds[1].lng) + rectBounds[1].lng);
    return [lat, lng];
};

export default fakeStore;
