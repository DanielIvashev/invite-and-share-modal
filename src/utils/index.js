import { getCssVar } from 'quasar';

let primary = (getCssVar('primary') || '').split('').slice(1);
let secondary = (getCssVar('secondary') || '').split('').slice(1);
primary = '%23' + primary.join('');
secondary = '%23' + secondary.join('');

export const iconsSvg = {
    closeIcon: `data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M1.70925 0.29327C1.3183 -0.0976991 0.684362 -0.0977652 0.293323 0.293123C-0.0977166 0.684011 -0.0977827 1.31783 0.293175 1.7088L5.58536 7.00114L0.301071 12.2845C-0.0899276 12.6754 -0.0899276 13.3092 0.301071 13.7002C0.692069 14.0911 1.326 14.0911 1.717 13.7002L7.00114 8.41697L12.2907 13.7067C12.6817 14.0977 13.3156 14.0978 13.7067 13.7069C14.0977 13.316 14.0978 12.6822 13.7068 12.2912L8.41707 7.00129L13.7046 1.71474C14.0956 1.32381 14.0956 0.689991 13.7046 0.299062C13.3136 -0.0918667 12.6796 -0.0918667 12.2886 0.299062L7.00129 5.58546L1.70925 0.29327Z' fill='%233C1F1D'/%3E%3C/svg%3E%0A`,
    listItemRemoveIcon: `data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M22 12.0002C22 6.47698 17.5222 2.00024 12 2.00024C6.47784 2.00024 2 6.47698 2 12.0002C2 17.5225 6.47779 22.0002 12 22.0002C17.5222 22.0002 22 17.5225 22 12.0002ZM12 3.50024C16.6938 3.50024 20.5 7.30551 20.5 12.0002C20.5 16.694 16.6938 20.5002 12 20.5002C7.30621 20.5002 3.5 16.694 3.5 12.0002C3.5 7.30551 7.30616 3.50024 12 3.50024ZM8 11.2502C7.58579 11.2502 7.25 11.586 7.25 12.0002C7.25 12.4145 7.58579 12.7502 8 12.7502H16C16.4142 12.7502 16.75 12.4145 16.75 12.0002C16.75 11.586 16.4142 11.2502 16 11.2502H8Z' fill='%23D1CAC1'/%3E%3C/svg%3E%0A`,
    checkmarkIcon: `data:image/svg+xml,%3Csvg width='16' height='12' viewBox='0 0 16 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.9429 11.4016L0.800049 6.29984L2.43548 4.71584L5.9429 8.16156L13.5646 0.601562L15.2 2.2267L5.9429 11.4016Z' fill='%239C4619'/%3E%3C/svg%3E%0A`
};
