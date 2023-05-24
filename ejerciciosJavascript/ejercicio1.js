// Ejercicio 1- Crear function javascript que calcule si eres mayor de edad o no

class Persona {

    constructor(nombre, edad){
        this.nombre = nombre
        this.edad = edad
    }

    mayor_de_edad(){
        let mayorDeEdad = false
        if (this.edad >= 18){
            mayorDeEdad = true
        } 
        return mayorDeEdad
    }
}

const persona1 = new Persona("Persona1", 25)

const persona2 = new Persona("Persona2", 13)

console.log("Es mayor de edad? " + persona1.mayor_de_edad())
console.log("Es mayor de edad? " + persona2.mayor_de_edad())

// 2- Crea una función que tome un número entero positivo y verifique si es un número primo

function esPrimo(num){
    let es_primo = false
    let i = 1
    let count = 0
    if (num > 1){
        while(i <= num){
            if (num % i == 0){
                count++
            }
            i++
        }  
        if (count == 2){
            es_primo = true
        }
    }
    return es_primo
}

console.log(esPrimo(7))
console.log(esPrimo(22))

// 3- Calcular los primeros 10 numeros primos y mostrarlos por pantalla en una lista (array)

function primeros10NumerosPrimos(){
    let primos = []
    let i = 1
    while (primos.length != 10){
        if (esPrimo(i)){
            primos.push(i)
        }
    }
    return primos
}

console.log(primeros10NumerosPrimos())

// 4- Encontrar el número más grande en un array de números negativos y positivos

function maxNum(array){
    let max_num = array[0]
    array.forEach(num => {
        if (num > max_num){
            max_num = num
        }
    });
    return max_num
}

let arrayNum = [11,-5,3,65,-30,40] 

console.log(maxNum(arrayNum))

// 5- Crea una función que tome una cadena de palabras separadas por espacios y devuelva la palabra más larga.

function palabraMasLarga(string){
    let array_palabras = string.split(" ")
    let mi_palabra = array_palabras[0]
    array_palabras.forEach(palabra => {
        if(mi_palabra.length < palabra.length){
            mi_palabra = palabra
        }
    });
    return mi_palabra
}

let palabras = "hola no palabra casa mio"

console.log(palabraMasLarga(palabras))

// 6- Crea una función que tome un objeto y devuelva una nueva versión del objeto donde todos los valores son duplicados.

function duplicarArray(array){
    let nuevo_array = []
    array.forEach(elemento => {
        nuevo_array.push(elemento+elemento)
    });
    return nuevo_array
}

let miArray = ["hola", "chau", "mesa", "sol"]

console.log(duplicarArray(miArray))

let arrayNum2 = [11,5,3,65,40] 

console.log(duplicarArray(arrayNum2))

// 7- Obtener el promedio de las edades de los usuarios mayores de edad

function es_mayor_de_edad(edad){
    let mayorDeEdad = false
    if (edad >= 18){
        mayorDeEdad = true
    } 
    return mayorDeEdad
}

function promedioMayores2(array){
    let mayores = array.filter(elm => es_mayor_de_edad(elm))
    let promedio = mayores.reduce((a,b) => a+b) / mayores.length
    return promedio
}

let edades = [22,4,15,60,48,18,7]

console.log(promedioMayores2(edades))