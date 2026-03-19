package com.example.composite.filesystem;

import java.util.ArrayList;
import java.util.List;

public class FolderComposite implements FileSystemComponent {
    private String name;
    private List<FileSystemComponent> children = new ArrayList<>();

    public FolderComposite(String name) {
        this.name = name;
    }

    public void add(FileSystemComponent component) {
        children.add(component);
    }

    @Override
    public void display(String indent) {
        System.out.println(indent + "+ Folder: " + name);
        for (FileSystemComponent child : children) {
            child.display(indent + "   ");
        }
    }
}