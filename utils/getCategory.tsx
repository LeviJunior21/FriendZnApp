import { Categoria } from "./interfaces";

export const getCategory = (categoria: Categoria) => {    
    let categoryString: string;
    
    switch (categoria) {
        case Categoria.todasCategorias:
            categoryString = "Todas Caategorias";
            break;
        case Categoria.amizade:
            categoryString = "Amizade";
            break;
        case Categoria.amor:
            categoryString = "Amor";
            break;
        case Categoria.astronomia:
            categoryString = "Astronomia";
            break;
        case Categoria.comida:
            categoryString = "Comida";
            break;
        case Categoria.dinheiro:
            categoryString = "Dinheiro";
            break;
        case Categoria.diversao:
            categoryString = "Diversão";
            break;
        case Categoria.esporte:
            categoryString = "Esporte";
            break;
        case Categoria.estudos:
            categoryString = "Estudos";
            break;
        case Categoria.familia:
            categoryString = "Família";
            break;
        case Categoria.lazer:
            categoryString = "Lazer";
            break;
        case Categoria.outro:
            categoryString = "Outro";
            break;
        case Categoria.saude:
            categoryString = "Saúde";
            break;
        case Categoria.sexualidade:
            categoryString = "Sexualidade";
            break;
        case Categoria.tecnologia:
            categoryString = "Tecnologia";
            break;
        default:
            categoryString = "Selecione uma categoria...";
    }

    return categoryString;
}

export const getColorCategory = (categoria: Categoria) => {
    let color: string;

    switch (categoria) {
        case Categoria.amizade:
            color = "green"; 
            break;
        case Categoria.amor:
            color = "red";
            break;
        case Categoria.astronomia:
            color = "blue";
            break;
        case Categoria.comida:
            color = "orange";
            break;
        case Categoria.dinheiro:
            color = "yellow";
            break;
        case Categoria.diversao:
            color = "purple";
            break;
        case Categoria.esporte:
            color = "cyan";
            break;
        case Categoria.estudos:
            color = "pink";
            break;
        case Categoria.familia:
            color = "brown";
            break;
        case Categoria.lazer:
            color = "teal";
            break;
        case Categoria.saude:
            color = "lightblue";
            break;
        case Categoria.sexualidade:
            color = "pink";
            break;
        case Categoria.tecnologia:
            color = "gray";
            break;
        default:
            color = "black";
    }

    return color;
}
