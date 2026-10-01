FROM maven:3.9-eclipse-temurin-17 AS build

WORKDIR /app

COPY internship-management/pom.xml .
COPY internship-management/src ./src

RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

CMD ["sh", "-c", "java -jar app.jar --server.port=${PORT:-8080}"]