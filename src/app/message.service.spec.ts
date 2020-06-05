import { MessageService } from "./message.service";

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    service = new MessageService(); // generate a brand new service with each test
  });


  it('should have no messages to start', () => {
    expect(service.messages.length).toBe(0);
  });

  it('should have a message when add is called', () => {
    service.add('message 1');
    expect(service.messages.length).toBe(1);
  });

  it('should have a no messages when clear is called', () => {
    service.add('message 1');
    service.clear();
    expect(service.messages.length).toBe(0);
  })
});
