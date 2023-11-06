export const enviarPublicacao = async(categoria: string, desabafo: string) => {
    if (categoria == "Selecione uma categoria...") {
        alert("Selecione uma categoria!");
    } else {
        const url: string = "http://10.0.0.181:8080/v1/publicacoes/publicacao?id=1";
        const dados = {
            publicacao: desabafo, 
            date: new Date().toISOString(),
            codigoAcesso: 12345
        }
        
        fetch(url, {
            method: "POST", 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
    }
}
