import Carts from '../../Shared/Components/Cart/Carts'
import { Helmet, HelmetProvider } from 'react-helmet-async'
function Cart() {
    return (
        <>
        <HelmetProvider>
        <Helmet>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>MY KOZAN - Cart</title>

            <meta name="keywords"
                content="MY KOZAN, eCommerce, online store, Doodle Board, Wooden Money Box, Selfie Stick, bulk product sales, best deals on Doodle Boards, Wooden Money Box store, Selfie Stick online, eCommerce Tamil Nadu, best online store for bulk products, Doodle Board for kids, creative gifts, Wooden Money Box for saving, high-quality selfie sticks, gift shop, MY KOZAN store, MY KOZAN products, Tamil Nadu eCommerce store, buy bulk Doodle Boards, shop for Wooden Money Box, selfie sticks online"
            />

            <meta name="description"
                content="MY KOZAN is an e-commerce web application offering a wide range of high-quality products like Doodle Boards, Wooden Money Boxes, and Selfie Sticks. We specialize in selling products in bulk and providing excellent deals to our customers."
            />

            <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
            <meta property="og:type" content="website" />
            <meta property="og:image" content="/assets/Images/Logo/favi.png" />

            <meta property="og:title"
                content="MY KOZAN - Your Ultimate Store for Doodle Boards, Wooden Money Boxes, and Selfie Sticks"
            />

            <meta property="og:description"
                content="MY KOZAN is an e-commerce web application offering a wide range of high-quality products like Doodle Boards, Wooden Money Boxes, and Selfie Sticks. We specialize in selling products in bulk and providing excellent deals to our customers."
            />

            <meta property="og:url" content="https://mykozan.com" />
            <meta property="og:site" content="MY KOZAN" />
            <meta property="og:site_name" content="MY KOZAN" />
            <link rel="canonical" href="https://mykozan.com" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@mykozan" />
            <meta name="twitter:title"
                content="MY KOZAN | Your Store for Bulk Doodle Boards, Wooden Money Boxes, and Selfie Sticks"
            />
            <meta name="twitter:description"
                content="Discover our exclusive range of products, including Doodle Boards, Wooden Money Boxes, and Selfie Sticks. Shop in bulk and enjoy fantastic deals at MY KOZAN."
            />
            <meta name="twitter:image" content="/assets/Images/Logo/favi.png" />
        </Helmet>
    </HelmetProvider>
          <Carts/> 
        </>
    )
}
export default Cart
