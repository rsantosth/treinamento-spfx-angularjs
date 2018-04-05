import { Usuario } from '../models/Usuario';
import pnp from 'sp-pnp-js';

export class UsuarioService {

    public listAllUsuarios(): Promise<Usuario[]> {
        return new Promise<Usuario[]>((resolve) => {
            pnp.sp.web.siteUsers.get().then((users: any[]) => {
                let result: Usuario[] = [];
                users.forEach((item: any) => {
                    if (item.Email)
                        result.push(Usuario.mapListItem(item));
                });
                resolve(result);                    
            });
        });      
    }    
}