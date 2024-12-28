// import {
//   HttpEvent,
//   HttpInterceptorFn,
//   HttpRequest,
//   HttpHandler,
//   HttpStatusCode,
// } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { NgxSpinnerService } from 'ngx-spinner';
// import { catchError, Observable, of } from 'rxjs';
// import { SpinnerType } from '../../base/base.component';
// import { CustomToastService } from '../ui/custom-toast.service';

// export const HttpErrorHandlerInterceptorService: HttpInterceptorFn = (
//   req,
//   next
// ): Observable<HttpEvent<any>> => {
//   const toastService = inject(CustomToastService);
//   const spinner = inject(NgxSpinnerService);

//   return next.handle(req).pipe(
//     catchError((error) => {
//       switch (error.status) {
//         case HttpStatusCode.Unauthorized:
//           toastService.showToast(
//             'Yetkisiz İşlem',
//             'Bu işlemi yapmaya yetkiniz bulunmamaktadır!',
//             'warn'
//           );
//           break;
//         case HttpStatusCode.InternalServerError:
//           toastService.showToast(
//             'Sunucu Hatası',
//             'Sunucuya erişilemiyor!',
//             'error'
//           );
//           break;
//         case HttpStatusCode.BadRequest:
//           toastService.showToast(
//             'Geçersiz İstek',
//             'Lütfen isteğinizi kontrol edin!',
//             'warn'
//           );
//           break;
//         case HttpStatusCode.NotFound:
//           toastService.showToast(
//             'Sayfa Bulunamadı',
//             'Lütfen doğru bir URL giriniz!',
//             'info'
//           );
//           break;
//         default:
//           toastService.showToast(
//             'Hata',
//             'Beklenmeyen bir hata meydana geldi!',
//             'error'
//           );
//           break;
//       }

//       spinner.hide(SpinnerType.BallAtom);
//       return of(error); // Hata döndürülür
//     })
//   );
// };
