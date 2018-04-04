export class Usuario {
    public id: number;
    public nome: string;
    public email: string;
    public login: string;
    public imagemUrl: string;

    public static mapListItem(listItem: any): Usuario {
        return {
            id: listItem.Id,
            nome: listItem.Title,
            email: listItem.Email,
            login: listItem.LoginName,
            imagemUrl: '/_layouts/15/userphoto.aspx?size=S&username=' + listItem.email
        } as Usuario;
    }    
}