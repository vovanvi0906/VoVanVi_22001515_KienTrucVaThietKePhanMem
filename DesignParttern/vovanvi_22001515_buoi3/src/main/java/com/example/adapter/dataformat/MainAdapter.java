package com.example.adapter.dataformat;

public class MainAdapter {
    public static void main(String[] args) {
        XmlService xmlService = new XmlService();
        JsonService adapter = new XmlToJsonAdapter(xmlService);

        String jsonData = "{\"name\":\"Johan\",\"age\":20}";
        String result = adapter.processJson(jsonData);

        System.out.println("Kết quả adapter:");
        System.out.println(result);
    }
}