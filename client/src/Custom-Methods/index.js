export default function orderAlphabetically(arrayIn, type, property) {

    if (type === '' || property === '') {
        return arrayIn;
    }

    if (property === 'weight') {
        let weightAverage = 'weightAverage';
        const arrayOut = arrayIn.map(obj => {
                let arrayOfString = obj[property].split(' ');
                let arrayOfNumbers = [Number(arrayOfString[0]), Number(arrayOfString[2])]
                let propertyNum = (arrayOfNumbers[0] + arrayOfNumbers[1]) / 2;
                return {
                    ...obj,
                    [weightAverage]: propertyNum
                }
            })
            // console.log(arrayOut);
        if (type === 'asc') {
            function ascOrder(x, y) {
                if (x[weightAverage] < y[weightAverage]) { return -1; }
                if (x[weightAverage] > y[weightAverage]) { return 1; }
                return 0;
            }
            console.log('Peso orden ascendente', arrayOut);
            return arrayOut.sort(ascOrder);
        }

        if (type === 'des') {
            function desOrder(x, y) {
                if (x[weightAverage] < y[weightAverage]) { return 1; }
                if (x[weightAverage] > y[weightAverage]) { return -1; }
                return 0;
            }
            console.log('Peso orden descendente', arrayOut);
            return arrayOut.sort(desOrder);
        }
    }

    if (property === 'name') {
        if (type === 'asc') {
            function ascOrder(x, y) {
                if (x[property] < y[property]) { return -1; }
                if (x[property] > y[property]) { return 1; }
                return 0;
            }
            console.log('Nombre orden ascendente', arrayIn);
            return arrayIn.sort(ascOrder);
        }

        if (type === 'des') {
            function desOrder(x, y) {
                if (x[property] < y[property]) { return 1; }
                if (x[property] > y[property]) { return -1; }
                return 0;
            }
            console.log('Nombre orden descendente', arrayIn);
            return arrayIn.sort(desOrder);
        }
    }

}