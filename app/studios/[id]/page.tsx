import { Suspense } from "react";
import StudioDetailsClient from "@/components/StudioDetailsClient";


async function StudioDetailsLoader({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <StudioDetailsClient id={id} />;
}

export default function StudioDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense 
      fallback={
        <div className="flex justify-center items-center min-h-[70vh]">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <StudioDetailsLoader params={params} />
    </Suspense>
  );
}