import { OrderDetail } from './order-detail';

export class Order {
  constructor(initData?: Partial<Order>) {
    Object.assign(this, initData);
  }

  name!: string;
  address!: string;
  telephone!: string;
  details!: OrderDetail[];
}
