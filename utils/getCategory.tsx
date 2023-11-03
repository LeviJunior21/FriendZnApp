export const getCategory = (categoria: number) => {
    let response: string = "";
  
    switch (categoria) {
      case 1:
        response = "Amizade";
        break;
      case 2:
        response = "Diversão";
        break;
      default:
        response = "Amizade";
    }
  
    return response;
}


export const getColorCategory = (categoria: number) => {
    let color: string = "";

    switch(categoria) {
        case 1:
            color = "blue";
        case 2:
            color = "purple";
        case 3:
            color = "red";
        default: 
            color = "blue";
    }

    return color;
}