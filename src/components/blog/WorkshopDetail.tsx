import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Workshop, mockWorkshops } from "./Workshop";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Code,
  DollarSign,
  AlertCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface WorkshopDetailProps {
  workshops?: Workshop[];
  isAuthorized?: boolean;
}

const WorkshopDetail = ({
  workshops = mockWorkshops,
  isAuthorized = false, // Default to false, should be passed from parent based on user role
}: WorkshopDetailProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const workshop = workshops.find((workshop) => workshop.id === id);

  if (!workshop) {
    return (
      <div className="p-8 bg-background min-h-screen">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="mb-6 hover:bg-secondary transition-all duration-200"
        >
          <ArrowLeft className="mr-2" size={16} />
          Back to Workshops
        </Button>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Workshop Not Found</h2>
          <p className="text-muted-foreground">
            The workshop you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  const handleEnrollClick = () => {
    if (workshop.isPaid) {
      // For paid workshops, show payment dialog
      alert(`You are now being redirected to payment for ${workshop.price}`);
    } else {
      // For free workshops, show enrollment confirmation
      alert("You have successfully enrolled in this free workshop!");
    }
  };

  const handleConductWorkshop = () => {
    if (isAuthorized) {
      // Logic for authorized users to conduct the workshop
      console.log("Conducting workshop as authorized user");
      // In a real app, this would redirect to workshop management page
      alert(
        "You are now conducting this workshop as an authorized instructor!",
      );
    } else {
      setShowAuthDialog(true);
    }
  };

  return (
    <div className="p-8 bg-background min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Button
        variant="outline"
        onClick={() => navigate(-1)}
        className="mb-6 hover:bg-secondary transition-all duration-200"
      >
        <ArrowLeft className="mr-2" size={16} />
        Back to Workshops
      </Button>

      <div className="max-w-4xl mx-auto">
        <div className="h-80 overflow-hidden rounded-lg mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <img
            src={workshop.imageUrl}
            alt={workshop.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex justify-between items-start mb-4">
          <h1 className="text-3xl font-bold">{workshop.title}</h1>
          <Badge
            variant={workshop.isPaid ? "default" : "outline"}
            className={
              workshop.isPaid ? "bg-primary" : "border-primary text-primary"
            }
          >
            {workshop.isPaid ? (
              <span className="flex items-center">
                <DollarSign size={14} className="mr-1" />
                {workshop.price}
              </span>
            ) : (
              "Free"
            )}
          </Badge>
        </div>

        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <span className="mr-4">Instructor: {workshop.instructor}</span>
          <div className="flex items-center mr-4">
            <Calendar size={14} className="mr-1" />
            <span>{workshop.date}</span>
          </div>
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            <span>{workshop.duration}</span>
          </div>
        </div>

        <div className="mb-6">
          <Badge variant="secondary" className="mb-4">
            {workshop.level}
          </Badge>
          <p className="text-lg">{workshop.description}</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <Code size={14} className="mr-1" />
            <span>Tech Stack:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {workshop.techStack.map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex space-x-4 mt-8">
          <Button
            onClick={handleEnrollClick}
            className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 transform hover:scale-105"
          >
            {workshop.isPaid ? "Enroll Now" : "Register Free"}
          </Button>
          <Button
            variant="outline"
            onClick={handleConductWorkshop}
            className="hover:bg-secondary transition-all duration-200"
          >
            Conduct Workshop
          </Button>
        </div>
      </div>

      {/* Authorization Dialog */}
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <AlertCircle className="mr-2 text-amber-500" size={20} />
              Authorization Required
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Only authorized instructors can conduct workshops.</p>
            <p className="text-muted-foreground mt-2">
              Please contact the administrator if you believe you should have
              access.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAuthDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorkshopDetail;
