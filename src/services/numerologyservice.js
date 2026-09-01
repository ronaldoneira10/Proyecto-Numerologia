function reducirNumero(numero) {

    while (numero > 9 && numero != 11 && numero != 22 && numero != 33) {

        let suma = 0;

        for (let digito of numero.toString()) {
            suma += parseInt(digito);
        }

        numero = suma;
    }

    return numero;
}


function numeroVida(fecha) {

    let fechaNacimiento = new Date(fecha);

    let dia = fechaNacimiento.getUTCDate();
    let mes = fechaNacimiento.getUTCMonth() + 1;
    let año = fechaNacimiento.getUTCFullYear();

    dia = reducirNumero(dia);
    mes = reducirNumero(mes);
    año = reducirNumero(año);

    let resultado = dia + mes + año;

    return reducirNumero(resultado);
}


function numeroExpresion(nombre) {

    let valores = {
        A: 1, B: 2, C: 3,
        D: 4, E: 5, F: 6,
        G: 7, H: 8, I: 9,
        J: 1, K: 2, L: 3,
        M: 4, N: 5, O: 6,
        P: 7, Q: 8, R: 9,
        S: 1, T: 2, U: 3,
        V: 4, W: 5, X: 6,
        Y: 7, Z: 8
    };

    nombre = nombre.toUpperCase();

    let suma = 0;

    for (let letra of nombre) {

        if (valores[letra]) {
            suma += valores[letra];
        }
    }

    return reducirNumero(suma);
}


function numeroAlma(nombre) {

    let valores = {
        A: 1,
        E: 5,
        I: 9,
        O: 6,
        U: 3
    };

    nombre = nombre.toUpperCase();

    let suma = 0;

    for (let letra of nombre) {

        if (valores[letra]) {
            suma += valores[letra];
        }
    }

    return reducirNumero(suma);
}


module.exports = {
    reducirNumero,
    numeroVida,
    numeroExpresion,
    numeroAlma
};