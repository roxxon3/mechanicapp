
import React from "react";
import { useForm } from "react-hook-form";
import { CreditCard, Calendar, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface PaymentFormProps {
  onSubmit: () => void;
  isProcessing: boolean;
}

const formSchema = z.object({
  cardName: z.string().min(3, "Name is required"),
  cardNumber: z.string().min(16, "Card number must be 16 digits").max(19),
  expiryDate: z.string().regex(/^\d{2}\/\d{2}$/, "Must be in format MM/YY"),
  cvv: z.string().min(3, "CVV must be 3-4 digits").max(4)
});

const PaymentForm = ({ onSubmit, isProcessing }: PaymentFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: ""
    }
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit();
  };

  // Credit card number formatter
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    }
    return value;
  };

  // Expiry date formatter
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length > 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return value;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="cardName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cardholder Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="John Smith"
                  disabled={isProcessing}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card Number</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    placeholder="1234 5678 9012 3456"
                    disabled={isProcessing}
                    maxLength={19}
                    onChange={(e) => {
                      field.onChange(formatCardNumber(e.target.value));
                    }}
                    value={field.value}
                  />
                  <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="expiryDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expiry Date</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      placeholder="MM/YY"
                      disabled={isProcessing}
                      maxLength={5}
                      onChange={(e) => {
                        field.onChange(formatExpiryDate(e.target.value));
                      }}
                      value={field.value}
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cvv"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CVV</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      placeholder="123"
                      disabled={isProcessing}
                      maxLength={4}
                      type="password"
                      {...field}
                    />
                    <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button 
          type="submit" 
          className="w-full" 
          variant="uber"
          size="lg"
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Pay $100.00"}
        </Button>
      </form>
    </Form>
  );
};

export default PaymentForm;
