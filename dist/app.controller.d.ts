import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    connect(): Promise<unknown>;
    checkacces(): Promise<unknown>;
    get_partner(): Promise<unknown>;
    get_readpartner(): Promise<unknown>;
    create_partner(part: any): Promise<unknown>;
    update_partner(id: string, part: any): Promise<unknown>;
}
