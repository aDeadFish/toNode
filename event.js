// ���� events ģ��
var events = require('events');
// ���� eventEmitter ����
var eventEmitter = new events.EventEmitter();

// �����¼��������
var connectHandler = function connected() {
    console.log('连接成功！');

    // ���� data_received �¼�
    eventEmitter.emit('data_received');
}

// �� connection �¼��������
eventEmitter.on('connection', connectHandler);

// ʹ������������ data_received �¼�
eventEmitter.on('data_received', function(){
    console.log('数据接收成功！');
});

// ���� connection �¼�
eventEmitter.emit('connection');

console.log("程序执行完毕！");