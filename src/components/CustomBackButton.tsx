import React from 'react';
import { TouchableOpacity } from 'react-native';
import Svg, { Rect, Path } from 'react-native-svg';

interface CustomBackButtonProps {
    onPress: () => void;
}
const CustomBackButtonNoBackground: React.FC<CustomBackButtonProps> = ({ onPress }) => {
    return (
        <TouchableOpacity style={{ flex: 0.25 ,justifyContent:'center',paddingLeft:20,paddingVertical:16}} onPress={onPress}>
            <Svg width="18" height="16" viewBox="0 0 18 16" fill="none">
                <Path d="M17.8125 8.00013C17.8125 8.14931 17.7532 8.29239 17.6477 8.39788C17.5423 8.50337 17.3992 8.56263 17.25 8.56263H2.10843L7.89749 14.3526C7.95276 14.4041 7.99708 14.4662 8.02783 14.5352C8.05857 14.6042 8.0751 14.6787 8.07644 14.7542C8.07777 14.8298 8.06388 14.9048 8.03558 14.9748C8.00729 15.0449 7.96519 15.1085 7.91177 15.1619C7.85836 15.2153 7.79473 15.2574 7.72469 15.2857C7.65465 15.314 7.57963 15.3279 7.5041 15.3266C7.42857 15.3252 7.35409 15.3087 7.28509 15.278C7.21609 15.2472 7.15399 15.2029 7.10249 15.1476L0.352493 8.39763C0.247155 8.29216 0.187988 8.14919 0.187988 8.00013C0.187988 7.85107 0.247155 7.7081 0.352493 7.60263L7.10249 0.852629C7.20912 0.753269 7.35016 0.699177 7.49588 0.701748C7.64161 0.704319 7.78065 0.763353 7.88371 0.866413C7.98677 0.969472 8.0458 1.10851 8.04837 1.25424C8.05095 1.39996 7.99685 1.541 7.89749 1.64763L2.10843 7.43763H17.25C17.3992 7.43763 17.5423 7.49689 17.6477 7.60238C17.7532 7.70787 17.8125 7.85094 17.8125 8.00013Z" fill="#0B1015" />
            </Svg>
        </TouchableOpacity>
    );
};
export default CustomBackButtonNoBackground;

