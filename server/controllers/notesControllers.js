import Note from "../models/noteModel.js";

function formatDate(mongoDate) {
  const dateObject = new Date(mongoDate);

  // Get the date and time components separately
  const formattedDate = dateObject.toLocaleDateString(); // E.g., "7/29/2023"
  const formattedTime = dateObject.toLocaleTimeString();
  return `${formattedDate}, ${formattedTime}`;
}

export const createNote = async (req, res) => {
  const formattedDate = formatDate(new Date());
  const { title, content, labels, completed } = req.body;
  const userId = req.user._id;
  const newNote = new Note({
    title,
    content,
    labels,
    completed,
    user: userId,
    formattedCreateDate: formattedDate,
    createdAt: Date.now(),
  });
  try {
    await newNote.save();
    return res.status(200).json({
      message: "Note created successfully",
      note: newNote,
    });
  } catch (error) {
    console.log("Error creating note: ", error);
    return res.status(400).json({
      error: "Note not created",
    });
  }
};

export const getNotes = async (req, res) => {
  try {
    const userId = req.user._id;
    const notes = await Note.find({ user: userId });
    return res.status(200).json({
      data: notes,
      success: 1,
    });
  } catch (error) {
    console.log("Error getting notes: ", error);
    return res.status(400).json({
      error: "Notes not fetched",
    });
  }
};

export const updateNote = async (req, res) => {
  const formattedDate = formatDate(new Date());
  try {
    const userId = req.user._id;
    console.log("User Id: ", userId);
    const noteId = req.params.id;
    const { title, content, labels, completed } = req.body;
    const updatedNote = await Note.findOneAndUpdate(
      { _id: noteId, user: userId },
      {
        title,
        content,
        labels,
        completed,
        formattedUpdateDate: formattedDate,
        updatedAt: Date.now(),
      },
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({
        error: "Note not found",
      });
    }
    return res.status(200).json({
      message: "Note updated successfully",
      note: updatedNote,
    });
  } catch (error) {
    console.log("Error updating note=> ", error);
    return res.status(400).json({
      error: "Note Updation failed",
    });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const userId = req.user._id;
    const noteId = req.params.id;
    const deletedNote = await Note.findOneAndDelete({
      _id: noteId,
      user: userId,
    });
    if (!deleteNote) {
      return res.status(400).json({
        error: "Note not found",
      });
    }
    return res.status(200).json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.log("Error deleting note=> ", error);
    res.status(400).json({
      error: "Note Deletion failed",
    });
  }
};
