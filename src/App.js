import Home from "./routes/home/home.component";
import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="auth" element={<Authentication />} />
        {/* Asterisk in shop/* tells React that when it starts matching this path
        there will be a subsequent URL parameter set after shop.
        We don't care what it is, just match shop/anything.
        As long as you match that, forward them and render this component.
        Shop component will have its own routes inside.
        */}
        <Route path="shop/*" element={<Shop />} />
        <Route path="checkout" element={<Checkout />} />

      </Route>
    </Routes>
  );
};

export default App;
