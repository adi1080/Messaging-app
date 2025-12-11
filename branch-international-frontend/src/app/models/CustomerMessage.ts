export interface CustomerMessage {
  id: number;
  userId: number;
  messageBody: string;
  respondedBy?: string;
  respondedAt?: string;
  reply: string;
  urgency: number;
  customerInfo: any;
}