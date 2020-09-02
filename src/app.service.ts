import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(tst): string {
    return tst;
  }
  connected(con): string{
    if (con){
      return "connected"
    }
    else {
    return "not connected"
    }

  }
}
