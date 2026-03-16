"use client";

import {
  X,
  Bike,
  Package,
  Warehouse,
  Truck,
  Globe,
  Plane,
  Rocket,
  CreditCard,
  MessageCircle,
  TrendingUp,
  BarChart3,
  IndianRupee,
  ShieldCheck,
  Layers,
} from "lucide-react";

export default function AllProductsModal({
  open,
  onClose,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-white overflow-y-auto">
       
      <button
        onClick={onClose}
        className="fixed top-6 right-6 p-2 rounded-full hover:bg-gray-100 z-[110]"
      >
        <X className="w-5 h-5" />
      </button>

    
      <div className="max-w-7xl mx-auto px-12 pt-12 pb-16 space-y-14">
       
        <div>
          <h2 className="text-3xl font-semibold">
            Select the product you would like to experience
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Elevate your business with our industry-leading products.
          </p>
        </div>

      
        <Section title="Recently Used Products">
          <Grid>
            <ProductCard title="Instant Deliveries" icon={Bike} />
            <ProductCard title="Domestic Shipping" icon={Package} />
          </Grid>
        </Section>

         
        <Section title="Shipping & Fulfilment in India">
          <Grid>
            <ProductCard
              title="Domestic Shipping"
              desc="Multiple couriers, SDD/NDD"
              icon={Warehouse}
            />
            <ProductCard
              title="Instant Deliveries"
              desc="Hyperlocal & Intracity"
              icon={Truck}
            />
            <ProductCard
              title="Warehousing"
              desc="End-to-end fulfilment"
              icon={Warehouse}
            />
            <ProductCard
              title="Cargo"
              desc="FTL & PTL shipments"
              icon={Warehouse}
            />
          </Grid>
        </Section>

     
        <Section title="Cross Border Commerce">
          <Grid>
            <ProductCard
              title="International Parcels"
              desc="Ship to 220+ countries"
              icon={Warehouse}
            />
            <ProductCard
              title="International Cargo"
              desc="Air & Ocean freight"
              icon={Warehouse}
            />
            <ProductCard
              title="Brand Launch"
              desc="Expand globally"
              icon={Warehouse}
            />
          </Grid>
        </Section>

        
        <Section title="Growth & Marketing Solutions">
          <Grid>
            <ProductCard title="Checkout" icon={ShieldCheck} />
            <ProductCard title="Whatsapp Solutions" icon={ShieldCheck} />
            <ProductCard title="Marketing" icon={ShieldCheck} />
            <ProductCard title="Trends" icon={ShieldCheck} />
          </Grid>
        </Section>

        
        <Section title="Financial Services">
          <Grid>
            <ProductCard title="Business Loan" icon={IndianRupee} />
            <ProductCard title="Credit Score" icon={ShieldCheck} />
          </Grid>
        </Section>

       
        <Section title="Other Services">
          <Grid>
            <ProductCard title="Omnichannel" icon={Warehouse} />
          </Grid>
        </Section>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-6">{title}</h3>
      {children}
    </div>
  );
}

function Grid({ children }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {children}
    </div>
  );
}

function ProductCard({
  title,
  desc,
  icon: Icon,
}) {
  return (
    <div className="bg-white border rounded-xl p-5 hover:shadow-md transition cursor-pointer">
      {/* ICON */}
      <div className="h-28 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
        <div className="h-12 w-12 rounded-full bg-white shadow flex items-center justify-center">
          <Icon className="w-6 h-6 text-indigo-600" />
        </div>
      </div>

      <h4 className="font-medium">{title}</h4>
      {desc && <p className="text-sm text-gray-500 mt-1">{desc}</p>}
      <p className="mt-3 text-sm text-blue-600 font-medium">Get Started →</p>
    </div>
  );
}