---
layout: post
title:  "Dockerizing a Spring Boot Application"
date:   2022-05-28 15:04:03 -0700
categories:	[server]
tags:	[spring boot, docker]
author: Gastón Borba
menu: Blog
comments: true
---

# Spring Boot with Docker
This guide walks you through the process of building a Docker image for running a Spring Boot application.
<!--more-->

## What You Will Need
* JDK 17
* Maven
* Docker

## Starting with Spring Initializr
You can use this pre-initialized project and click Generate to download a ZIP file. This project is configured to fit the examples in this tutorial.

To manually initialize the project:
1. Navigate to <a href="https://start.spring.io">https://start.spring.io</a>. 
2. Choose Maven and the language you want to use. This guide assumes that you chose Java.
3. Click **Dependencies** and select **Spring Web**.
4. Click **Generate**.

<img src="/assets/img/spring-initializr.png" alt="Spring Initilizr" style="width: 100%;"/>

## Set up a Spring Boot Application
Now you can update the DemoApplication.java:

<pre><code class="language-java">package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class DemoApplication {

  public static void main(String[] args) {
    SpringApplication.run(DemoApplication.class, args);
  }

  @RequestMapping("/")
  public String home() {
    return "Hello World!";
  }
	
}
</code></pre>

## Containerize It
Create the following Dockerfile in your Spring Boot project:
<pre><code class="language-dockerfile">FROM maven:3.8.5-openjdk-17 as build

WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline -DskipTests

COPY src src
RUN mvn clean package

FROM openjdk:17

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]
</code></pre>

## Build the Docker Image

<pre><code class="language-bash">docker build -t demo:latest .
</code></pre>

## Run the Container

<pre><code class="language-bash">docker run -p 8080:8080 demo:latest
</code></pre>

Now you can visit <a href="http://localhost:8080">http://localhost:8080</a>  
You can download the source code <a href="https://github.com/gastonborba/demo-spring-boot">here</a>
