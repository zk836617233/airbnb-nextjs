"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import { SafeReervation, SafeUser } from "../types";

interface TripsClientProps {
  reservations: SafeReervation[];
  currentUser?: SafeUser | null;
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser,
}) => {
  console.log(reservations, "?reservations");

  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    async (id: string) => {
      setDeletingId(id);

      try {
        await axios.delete(`/api/reservations/${id}`);
        toast.success("success!");
        router.refresh();
      } catch (error: any) {
        toast.error(error);
      } finally {
        setDeletingId("");
      }
    },
    [router]
  );
  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="where you've been and where you're going"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((res) => (
          <ListingCard
            data={res.Listing}
            reservation={res}
            actionId={res.id}
            onAction={onCancel}
            disabled={deletingId === res.id}
            actionLabel="Cancel"
            currentUser={currentUser}
            key={res.id}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
