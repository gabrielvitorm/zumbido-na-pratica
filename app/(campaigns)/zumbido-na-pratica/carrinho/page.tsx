import { CartFlow } from "./cart-flow";
import { campaignConfig } from "../config";

export const dynamic = "force-dynamic";

export default function CarrinhoPage() {
  return <CartFlow salesWhatsappNumber={campaignConfig.salesWhatsappNumber} />;
}
