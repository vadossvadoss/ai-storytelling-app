"use client";

import { Zap, Crown, Gem } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ManaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const packages = [
  { name: "Spark", mana: 50, price: "$2.99", icon: Zap },
  { name: "Flame", mana: 150, price: "$7.99", icon: Gem, popular: true },
  { name: "Nova", mana: 500, price: "$19.99", icon: Crown },
];

export function ManaModal({ open, onOpenChange }: ManaModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Out of Mana</DialogTitle>
          <DialogDescription>
            You need Mana to continue your story. Purchase more to keep the adventure going.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 py-4">
          {packages.map((pkg) => (
            <Card
              key={pkg.name}
              className={pkg.popular ? "border-primary shadow-glow" : ""}
            >
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
                    <pkg.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold">
                      {pkg.name}
                      {pkg.popular && (
                        <span className="ml-2 text-xs text-accent">Popular</span>
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {pkg.mana} Mana
                    </p>
                  </div>
                </div>
                <Button variant={pkg.popular ? "default" : "secondary"} size="sm">
                  {pkg.price}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground">
          Stripe integration coming soon — this is a preview UI
        </p>
      </DialogContent>
    </Dialog>
  );
}
