"use client";

import React, { useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { SafeReervation, SafeUser } from "../types";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";

interface ReservationsClientProps {
  reservations: SafeReervation[];
  currentUser?: SafeUser | null;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      try {
        axios.delete(`api/reservations/${id}`);
        toast.success("success!");
        router.refresh();
      } catch (error) {
        toast.error("error");
      } finally {
        setDeletingId("");
      }
    },
    [router]
  );
  return (
    <Container>
      <Heading title="Reservations" subtitle="Booking on your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((res) => (
          <ListingCard
            data={res.Listing}
            reservation={res}
            actionId={res.id}
            onAction={onCancel}
            disabled={deletingId === res.id}
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
            key={res.id}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;
