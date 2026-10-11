import {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
} from "react";
import { InquiryModal } from "./InquiryModal";

interface InquiryContextValue {
  openInquiry: (product?: string) => void;
}

const InquiryContext = createContext<InquiryContextValue>({ openInquiry: () => {} });

export const useInquiry = () => useContext(InquiryContext);

export function InquiryProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<string | undefined>();

  const openInquiry = useCallback((productName?: string) => {
    setProduct(productName);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  return (
    <InquiryContext.Provider value={{ openInquiry }}>
      {children}
      <InquiryModal open={isOpen} product={product} onClose={close} />
    </InquiryContext.Provider>
  );
}
