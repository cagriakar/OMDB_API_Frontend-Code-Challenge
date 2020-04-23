Proje [Create React App](https://github.com/facebook/create-react-app) ile responsive olacak şekilde oluşturuldu.

Dolayısıyla herhangi bir webPack config işlemi gerekmedi.

-   http://www.omdbapi.com/ servisi kullanılarak film adı, film yılı ve film türü kullanarak sorgu yapılabilir.

-   Sonuçlar için API'ye sorgu; önce fetch() ile daha sonra detaylı bilgi için useSWR ile yapıldı.

-   Sonuçlar Card component içerisinde

    -   filmin adı,
    -   posteri,
    -   yılı,
    -   türü,
        olacak şekilde gösterildi.

-   Card component'ın hemen üzerinde sonuçlar favorilere eklenip çıkartılabilir. Ekleme ve çıkarma sırasında toast feedback ile kullanıcıya geri bildirim sunuuluyor.

-   Favoriler localStorage’da tutuluyor. (tekrar girildiğinde kaybolmuyor)

-   Favoriler sayfası ReactRouter ile eklendi. Bu sayfada favorilere eklenen filmler listeleniyor. Ayrıca buradan da favorilerden çıkarma işlemi yapılabilir.

-   Sorgu sırasında API'den cevap beklerken kullanıcıya "Skeleton" ile loadingContent gösteriliyor.

-   Sorgu sonucunda poster bilgisi yoksa "./src/assets/noImage.png" yolundaki resim kullanıcıya sunuluyor.

-   Favori listesi haricinde her şey state management ile halledildi.

-   Kompleks bir state management gerektiği için useContext ve useReducer hook'larından faydalanıldı.

-   Ayrıca sorgu sonucunda gelen bazı duplicate info'lar "./src/global/context/GlobalState.jsx" dosyasında fetch() sorgusundan sonra temizlenip o şekilde global state'e kaydedildi.
