import React, { useState, useEffect } from "react";
import {
  useCoverLetterDetails,
  useDeleteCoverLetter,
} from "@/hooks/coverletter.hook";
import { useNavigate } from "react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Eye, Trash2, Plus, Pencil } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const ShowAllCoverLetter = () => {
  const { data: allCoverLetter, isLoading, isError } = useCoverLetterDetails();
  const { mutate: deleteCoverLetter } = useDeleteCoverLetter();
  const navigate = useNavigate();

  const [notes, setNotes] = useState({});
  const [deletingId, setDeletingId] = useState(null);

  // 🔹 Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem("coverLetterNotes");
    if (savedNotes) setNotes(JSON.parse(savedNotes));
  }, []);

  // 🔹 Save to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem("coverLetterNotes", JSON.stringify(notes));
  }, [notes]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
        <span className="ml-2 text-gray-600">Loading cover letters...</span>
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load cover letters.
      </div>
    );

  if (!allCoverLetter || allCoverLetter.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
        <p className="text-gray-600 text-lg">You have no cover letters yet.</p>
        <Button
          className="flex items-center gap-2"
          onClick={() => navigate("/dashboard/cover-letter")}
        >
          <Plus className="w-4 h-4" /> Create Your First Cover Letter
        </Button>
      </div>
    );

  const handleDelete = (id) => {
    setDeletingId(id);
    deleteCoverLetter(id, {
      onSettled: () => {
        setDeletingId(null);

        // 🔹 Remove local note for deleted letter
        const updatedNotes = { ...notes };
        delete updatedNotes[id];
        setNotes(updatedNotes);
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6 md:p-10">
      <div className="flex justify-between items-center mb-6 max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold">
          My Generated Cover Letters
        </h2>
        <Button
          className="flex items-center gap-2"
          onClick={() => navigate("/dashboard/cover-letter")}
        >
          <Plus className="w-4 h-4" /> New Cover Letter
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {allCoverLetter.map((letter) => (
          <Card
            key={letter.id}
            className="p-6 flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 bg-white"
          >
            {/* Title */}
            <h3 className="text-xl font-semibold mb-1 line-clamp-1">
              {letter.title || "Untitled Cover Letter"}
            </h3>
            {notes[letter.id] && (
              <p className="text-sm text-gray-500 mb-2">{notes[letter.id]}</p>
            )}

            {/* User Info */}
            <div className="text-gray-600 text-sm mb-4">
              <p className="font-medium">{letter.user_profile?.full_name}</p>
              {letter.user_profile?.email && (
                <p className="truncate">{letter.user_profile.email}</p>
              )}
              {letter.user_profile?.phone && (
                <p className="truncate">{letter.user_profile.phone}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center mt-auto gap-3">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={() =>
                  navigate(`/dashboard/single-cover-letter/${letter.id}`)
                }
              >
                <Eye className="w-4 h-4" /> View
              </Button>

              {/* Add/Edit Note */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Pencil className="w-4 h-4" /> Add Note
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Identification Note</DialogTitle>
                  </DialogHeader>
                  <Input
                    placeholder="e.g. This cover letter is for Google"
                    value={notes[letter.id] || ""}
                    onChange={(e) => {
                      const newNotes = {
                        ...notes,
                        [letter.id]: e.target.value,
                      };
                      setNotes(newNotes);
                      localStorage.setItem(
                        "coverLetterNotes",
                        JSON.stringify(newNotes)
                      ); // ✅ save immediately
                    }}
                  />
                  <DialogFooter className="mt-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        // ✅ Force save on close
                        localStorage.setItem(
                          "coverLetterNotes",
                          JSON.stringify(notes)
                        );
                      }}
                    >
                      Close
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Delete Confirmation */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="flex items-center gap-1"
                    disabled={deletingId === letter.id}
                  >
                    {deletingId === letter.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Delete “{letter.title || "Untitled"}”?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the cover letter{" "}
                      <strong>{letter.title || "Untitled"}</strong>.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(letter.id)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ShowAllCoverLetter;
