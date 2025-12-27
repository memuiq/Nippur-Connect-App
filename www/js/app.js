import { UDP } from '@capacitor-community/udp';
import { LocalNotifications } from '@capacitor/local-notifications';

async function startListening() {
    // 1. فتح المقبس على بورت 8081
    const { socketId } = await UDP.create();
    await UDP.bind({ socketId, address: '0.0.0.0', port: 8081 });

    // 2. الاستماع للبيانات القادمة
    UDP.addListener('receive', async (info) => {
        const msg = atob(info.buffer); // تحويل البيانات لنص
        
        // 3. إظهار إشعار أندرويد رسمي للمشترك
        await LocalNotifications.schedule({
            notifications: [{
                title: "تنبيه من Nippur Connect",
                body: msg,
                id: 1,
                schedule: { at: new Date(Date.now() + 1000) }
            }]
        });
    });
}

startListening();
