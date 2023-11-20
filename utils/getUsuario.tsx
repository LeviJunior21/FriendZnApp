import { Usuario } from "../model/Usuario";

export const getUsuario = async(id: number):Promise<Usuario> => {
    try {
        const response = await fetch("http://10.0.0.181:8080/v1/usuarios/usuario/" + id);
        if (response.ok) {
            const data = await response.json();
            const usuario: Usuario = Usuario.builder()
                .withId(data.id)
                .withApelido(data.apelido)
                .build();

            return usuario;
        }
        else {
            return Usuario.builder().build();
        }
    }
    catch(e) {
        return Usuario.builder().build();
    }
}

