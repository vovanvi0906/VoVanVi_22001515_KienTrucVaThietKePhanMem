package com.example.adapter.dataformat;

public class XmlToJsonAdapter implements JsonService {
    private XmlService xmlService;

    public XmlToJsonAdapter(XmlService xmlService) {
        this.xmlService = xmlService;
    }

    @Override
    public String processJson(String json) {
        String xml = "<data>" + json + "</data>";
        return xmlService.processXml(xml);
    }
}