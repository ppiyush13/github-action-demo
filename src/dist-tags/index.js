import got from "got";
import { Url } from "../constants";

const distTagsResult = {
    result: {},
};

export const fetchDistTags = async packageName => {
    try {
        const response = await got(packageName, {
            prefixUrl: Url.npm,
            responseType: 'json',
        });
        distTagsResult.result = response.body['dist-tags'];
    }
    catch(ex) {
        if(ex.response && ex.response.statusCode === 404)
            return ;
        throw ex;
    }
};

export const getDistTagVersion = distTag => distTagsResult.result[distTag]; 
