FROM microsoft/dotnet:sdk AS build-env

WORKDIR /app
COPY . ./

RUN dotnet restore
RUN dotnet publish -c Release -o out

FROM microsoft/dotnet:aspnetcore-runtime

WORKDIR /app
COPY --from=build-env /app/out .

ENTRYPOINT ["dotnet", "EventMapr.dll"]

