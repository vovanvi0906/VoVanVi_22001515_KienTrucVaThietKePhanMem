package com.example.composite.filesystem;

public class MainFileSystem {
    public static void main(String[] args) {
        FolderComposite root = new FolderComposite("Root");
        FolderComposite docs = new FolderComposite("Documents");
        FolderComposite images = new FolderComposite("Images");

        docs.add(new FileLeaf("report.docx"));
        docs.add(new FileLeaf("notes.txt"));

        images.add(new FileLeaf("photo1.png"));
        images.add(new FileLeaf("photo2.jpg"));

        root.add(docs);
        root.add(images);
        root.add(new FileLeaf("readme.md"));

        root.display("");
    }
}

//Composite giúp xử lý file và folder theo cùng một cách thông qua interface chung.