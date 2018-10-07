import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    service = new MessageService();
  });

  it('should have no messages initially', () => {
    expect(service.messages.length).toBe(0);
  });

  it('should add a message if add() is called', () => {
    let message = 'message';
    service.add(message);

    expect(service.messages.length).toBe(1);
    expect(service.messages[0]).toBe(message);
  });

  it('should have no messages if clear() is called', () => {
    service.add('message');

    service.clear();

    expect(service.messages.length).toBe(0);
  });
});
