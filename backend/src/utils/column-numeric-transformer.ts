export class NumericColumTransformer{
    to(data: number){
        return data;
    }

    from(data: string){
        return parseFloat(data); 
    }
}