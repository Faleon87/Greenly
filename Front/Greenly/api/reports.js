
import { Alert } from "react-native";

// reportService.js
export const getReportStatus = async () => {
    try {
        const response = await fetch(`http://192.168.0.22:3000/chat/reports`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('getReportStatus response data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching report status:', error);
        Alert.alert('Error', `Error fetching report status: ${error.message}`);
        throw error;
    }
};

export default getReportStatus;