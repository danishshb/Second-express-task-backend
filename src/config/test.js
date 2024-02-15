exports.renameFolder = async (req, res) => {
    try {
      const userId = req.user._id;
      const fileId = req.params.fileId;
      const { newFolderName } = req.body;
  
      const user = await User.findById(userId);
  
      if (!user || user.userType !== "admin") {
        return res
          .status(403)
          .json({ error: "Insufficient permissions to rename the folder." });
      }
  
      const file = await File.findOne({
        _id: fileId,
      });
  
      if (!file) {
        return res.status(404).json({ error: "Folder not found" });
      }
  
      file.name = newFolderName;
  
      await file.save();
  
      res.status(200).json({ message: "Folder renamed successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something Went Wrong!" });
    }
  };