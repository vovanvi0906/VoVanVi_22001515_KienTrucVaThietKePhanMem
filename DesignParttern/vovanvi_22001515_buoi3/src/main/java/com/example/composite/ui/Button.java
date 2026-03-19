package com.example.composite.ui;

public class Button implements UIComponent {
    private String label;

    public Button(String label) {
        this.label = label;
    }

    @Override
    public void render(String indent) {
        System.out.println(indent + "Button: " + label);
    }
}