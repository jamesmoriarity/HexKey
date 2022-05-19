export class Labels{
    static getSuffixForPosition(index:number){
        let suffixes:string[] = ['st','nd','rd', 'th', 'th', 'th', 'th']
        return suffixes[index]
    }
}