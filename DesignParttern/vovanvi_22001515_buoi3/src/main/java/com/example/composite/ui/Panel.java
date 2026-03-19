package com.example.composite.ui;

import java.util.ArrayList;
import java.util.List;

public class Panel implements UIComponent {
    private String name;
    private List<UIComponent> children = new ArrayList<>();

    public Panel(String name) {
        this.name = name;
    }

    public void add(UIComponent component) {
        children.add(component);
    }

    @Override
    public void render(String indent) {
        System.out.println(indent + "Panel: " + name);
        for (UIComponent child : children) {
            child.render(indent + "   ");
        }
    }
}