package com.example.composite.filesystem;

public class FileLeaf implements FileSystemComponent {
    private String name;

    public FileLeaf(String name) {
        this.name = name;
    }

    @Override
    public void display(String indent) {
        System.out.println(indent + "- File: " + name);
    }
}