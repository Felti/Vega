import { InjectableRxStompConfig } from '@stomp/ng2-stompjs';
import { environment } from 'src/environments/environment';

export const RxStompConfig: InjectableRxStompConfig = {
	// Which server?
	brokerURL: `${environment.production ? 'wss' : 'ws'}://${environment.webSocketUrl}`,

	// How often to heartbeat?
	// Interval in milliseconds, set to 0 to disable
	heartbeatIncoming: 0, // Typical value 0 - disabled
	heartbeatOutgoing: 20000, // Typical value 20000 - every 20 seconds

	// Wait in milliseconds before attempting auto reconnect
	// Set to 0 to disable
	// Typical value 500 (500 milli seconds)
	reconnectDelay: 10000,
};
